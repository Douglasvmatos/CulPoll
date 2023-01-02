import Fastify from 'fastify';
import cors from '@fastify/cors'
import jwt from '@fastify/jwt';

import { poolRoutes } from './routes/pool';
import { userRoutes } from './routes/user';
import { gameRoutes } from './routes/game';
import { guessRoutes } from './routes/guess';
import { authRoutes } from './routes/auth';

async function bootstrap() {
    // try {
        const fastify = Fastify({
            logger: true,
        })
    
        await fastify.register(cors, {
            origin: true
        })
    
        await fastify.register(jwt, {
            secret: 'nlwcopa',
        })
    
        await fastify.register(poolRoutes)
        await fastify.register(userRoutes)
        await fastify.register(gameRoutes)
        await fastify.register(guessRoutes)
        await fastify.register(authRoutes)
    
        await fastify.listen({port: 3333, host: '0.0.0.0'})
    // } catch (err) {
    //     fastify.log.console.error(err);
        
    //     process.exit(1);
    // }
}

bootstrap()