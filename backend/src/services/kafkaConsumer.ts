import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
import { env } from '../config/envConfig';

dotenv.config();

const kafka = new Kafka({
  clientId: 'api-server-1',
  brokers: [env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'api-server-group' });

export const startKafkaConsumer = async () => {
  try {
    console.log('🔄 Connecting Kafka consumer...');
    await consumer.connect();
    console.log('✅ Kafka consumer connected');

    await consumer.subscribe({ topic: 'chat-messages', fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const msgValue = message.value?.toString();
        console.log(`📩 Received message on ${topic}:`, msgValue);

        // handle db logic
      },
    });
  } catch (err) {
    console.error('❌ Kafka consumer error:', err);
  }
};
