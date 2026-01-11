
// const capitalTrackCapitalForPoints = Object.fromEntries( Object.entries(capitalTrackPointsForCapital).map(([k, v]) => [v, Number(k)]) );
//TODO: Tool to select best export card.
const exportCards: ExportCard[] = [
    {
        food: {
            2: 15,
            6: 45
        },
        health: {
            3: 20,
            5: 30
        },
        luxuries: {
            3: 20,
            7: 50
        },
        education: {
            4: 25,
            8: 45
        }
    },
    {
        food: {
            4: 45,
            8: 85
        },
        health: {
            3: 15,
            5: 25
        },
        luxuries: {
            2: 15,
            6: 40
        },
        education: {
            3: 15,
            7: 35
        }
    },
    {
        food: {
            2: 20,
            6: 55
        },
        health: {
            3: 25,
            5: 40
        },
        luxuries: {
            4: 39,
            8: 55
        },
        education: {
            3: 15,
            7: 35
        }
    },
    {
        food: {
            3: 35,
            7: 80
        },
        health: {
            4: 20,
            8: 40
        },
        luxuries: {
            3: 15,
            5: 25
        },
        education: {
            2: 15,
            6: 45
        }
    },
    {
        food: {
            3: 30,
            5: 50
        },
        health: {
            3: 25,
            7: 55
        },
        luxuries: {
            2: 10,
            6: 35
        },
        education: {
            4: 25,
            8: 45
        }
    },
    {
        food: {
            2: 25,
            6: 65
        },
        health: {
            3: 20,
            7: 40
        },
        luxuries: {
            4: 20,
            7: 35
        },
        education: {
            3: 25,
            6: 45
        }
    },
    {
        food: {
            4: 40,
            7: 70
        },
        health: {
            2: 15,
            7: 50
        },
        luxuries: {
            3: 25,
            6: 50
        },
        education: {
            3: 20,
            5: 30
        }
    },
    {
        food: {
            2: 15,
            6: 50
        },
        health: {
            4: 30,
            7: 50
        },
        luxuries: {
            3: 15,
            7: 35
        },
        education: {
            3: 20,
            5: 35
        }
    },
    {
        food: {
            3: 25,
            6: 50
        },
        health: {
            3: 20,
            7: 40
        },
        luxuries: {
            3: 20,
            7: 50
        },
        education: {
            2: 15,
            7: 55
        }
    },
    {
        food: {
            4: 50,
            8: 95
        },
        health: {
            3: 15,
            7: 35
        },
        luxuries: {
            3: 20,
            5: 30
        },
        education: {
            2: 15,
            6: 40
        }
    },
    {
        food: {
            3: 30,
            7: 70
        },
        health: {
            3: 20,
            5: 35
        },
        luxuries: {
            4: 30,
            6: 40
        },
        education: {
            2: 15,
            6: 35
        }
    },
    {
        food: {
            3: 35,
            7: 75
        },
        health: {
            3: 20,
            5: 35
        },
        luxuries: {
            2: 10,
            6: 35
        },
        education: {
            4: 25,
            7: 40
        }
    },
    {
        food: {
            3: 25,
            7: 55
        },
        health: {
            2: 10,
            6: 35
        },
        luxuries: {
            4: 25,
            8: 45
        },
        education: {
            3: 20,
            5: 35
        }
    },
    {
        food: {
            2: 15,
            6: 50
        },
        health: {
            4: 25,
            8: 45
        },
        luxuries: {
            3: 25,
            5: 40
        },
        education: {
            3: 15,
            7: 35
        }
    },
    {
        food: {
            4: 45,
            7: 80
        },
        health: {
            2: 15,
            6: 40
        },
        luxuries: {
            3: 20,
            5: 30
        },
        education: {
            3: 20,
            7: 50
        }
    },
    {
        food: {
            3: 30,
            5: 50
        },
        health: {
            3: 20,
            6: 50
        },
        luxuries: {
            3: 25,
            7: 55
        },
        education: {
            3: 20,
            7: 50
        }
    },
]

export type ExportCard = {
    food: Record<number, number>,
    health: Record<number, number>,
    education: Record<number, number>,
    luxuries: Record<number, number>
}

export default exportCards;