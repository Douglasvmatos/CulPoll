import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'http://github.com/douglasvmatos.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: { 
                userId: user.id 
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-12-15T12:00:00.130Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-12-20T18:00:00.130Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 3,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })

}

main()