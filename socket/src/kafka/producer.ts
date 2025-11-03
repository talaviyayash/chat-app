import { Kafka, Partitioners } from 'kafkajs';
import { env } from '../config/envConfig';

const kafka = new Kafka({
  clientId: 'socket-server-1',
  brokers: [env.KAFKA_BROKER],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

let isConnected = false;

// Connect producer on startup
const connectProducer = async () => {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    console.log('✅ Kafka producer connected');
  }
};

// Initialize connection
connectProducer().catch((err) => {
  console.error('❌ Failed to connect Kafka producer:', err);
});

export const produceMessage = async (topic: string, message: string) => {
  try {
    if (!isConnected) {
      await connectProducer();
    }
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
  } catch (error) {
    console.error('❌ Failed to produce message:', error);
    throw error;
  }
};

const consumer = kafka.consumer({ groupId: 'socket-group-1' });

let isConsumerConnected = false;

// Connect consumer with retry logic
const connectConsumer = async (retries = 5, delay = 2000) => {
  if (isConsumerConnected) {
    return;
  }

  for (let i = 0; i < retries; i++) {
    try {
      await consumer.connect();
      isConsumerConnected = true;
      console.log('✅ Kafka consumer connected');
      return;
    } catch (error: any) {
      if (i < retries - 1) {
        console.log(`⏳ Retrying consumer connection... (${i + 1}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error(
          '❌ Failed to connect Kafka consumer after retries:',
          error,
        );
        throw error;
      }
    }
  }
};

export const consumeMessages = async (topic: string) => {
  try {
    if (!isConsumerConnected) {
      await connectConsumer();
    }
    await consumer.subscribe({ topic, fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Message received:', {
          topic,
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        });
      },
    });
  } catch (error) {
    console.error('❌ Failed to consume messages:', error);
    throw error;
  }
};

// Initialize consumer connection on startup with a small delay to ensure Kafka is ready
setTimeout(() => {
  consumeMessages('chat-messages').catch((err) => {
    console.error('❌ Failed to start consuming messages:', err);
  });
}, 3000); // Wait 3 seconds for Kafka to be fully ready
