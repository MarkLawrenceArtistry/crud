

export async function createUser(data) {
    const response = await fetch(`http://localhost:3000/api/users/`, {
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify(data)
    })

    const result = await response.json()

    return result.data
}

export async function getAllUsers() {
    const response = await fetch(`http://localhost:3000/api/users/`)

    const result = await response.json()

    return result.data
}