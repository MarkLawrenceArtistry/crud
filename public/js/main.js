import * as api from './api.js';

document.addEventListener('DOMContentLoaded', () => {

    // Declarations
    // --- USER MANAGEMENT ---
    const userForm = document.querySelector('#user-form');
    const usersTableDiv = document.querySelector('#users-table');


    // Rendering
    async function loadUsers() {
        try {
            const data = await api.getAllUsers()
            let usersTable = new DataTable(usersTableDiv, {
                data: data,
                columns: [
                    { data: 'id', },
                    { data: 'username', },
                    { data: 'created_at', }
                ]
            })
        } catch(err) {
            alert(`Error: ${err.message}`)
            console.error(`Error: ${err.message}`)
        }
    }



    // Functions and Event Listeners
    // --- USER MANAGEMENT ---
    userForm.addEventListener('submit', async (e) => {
        try {
            e.preventDefault();
            
            const usernameInput = document.querySelector('#user-username').value.trim()
            const passwordInput = document.querySelector('#user-password').value.trim()

            if(!usernameInput || !passwordInput) {
                alert('All fields required.');
                return;
            }

            const data = {
                username: usernameInput,
                password: passwordInput
            }

            const result = await api.createUser(data)
            alert(`Created user successfully!: ${result}`)

        } catch(err) {
            alert(`Error: ${err.message}`)
            console.log(`Error: ${err.message}`)
        }
    })

    loadUsers();
})