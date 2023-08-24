
import Swal from 'sweetalert2'
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

const Contact = () => {

    const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts') || []))

    // create contact 
    const handleCreateContact = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add Contact',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="First Name">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Last Name">' +
                '<div class="swal2-radio-container">' +
                '<label>Status:</label>' +
                '<div class="swal2-radio-options">' +
                '<label class="swal2-radio-label"><input type="radio" name="swal-radio" value="Active"> Active</label>' +
                '<label class="swal2-radio-label"><input type="radio" name="swal-radio" value="Inactive"> Inactive</label>' +
                '</div>' +
                '</div>',
            focusConfirm: false,
            preConfirm: () => {
                const firstName = document.getElementById('swal-input1').value;
                const lastName = document.getElementById('swal-input2').value;
                const status = document.querySelector('input[name="swal-radio"]:checked');

                if (!firstName || !lastName || !status) {
                    Swal.showValidationMessage('Please fill out all fields');
                    return;
                }

                return [firstName, lastName, status.value];
            },
        });

        if (formValues) {
            const [firstName, lastName, status] = formValues;
            // Save contact data to localStorage
            const contact = { firstName, lastName, status };
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(contacts));

            // Display contact data from localStorage
            console.log('Contacts stored in localStorage:', contacts);
            setContacts(contacts)

            Swal.fire({
                title: 'Contact Added!',
                html: `
                    <p>First Name: ${firstName}</p>
                    <p>Last Name: ${lastName}</p>
                    <p>Status: ${status}</p>
                `,
                icon: 'success',
            });
        }
    };

    // edit contact 
    const handleEditClick = async (index) => {
        const contact = contacts[index];

        const { value: formValues } = await Swal.fire({
            title: 'Edit Contact',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="First Name" value="${contact.firstName}">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Last Name" value="${contact.lastName}">` +
                '<div class="swal2-radio-container">' +
                '<label>Status:</label>' +
                '<div class="swal2-radio-options">' +
                `<label class="swal2-radio-label"><input type="radio" name="swal-radio" value="active" ${contact.status === 'active' ? 'checked' : ''
                }> Active</label>` +
                `<label class="swal2-radio-label"><input type="radio" name="swal-radio" value="inactive" ${contact.status === 'inactive' ? 'checked' : ''
                }> Inactive</label>` +
                '</div>' +
                '</div>',
            focusConfirm: false,
            preConfirm: () => {
                const firstName = document.getElementById('swal-input1').value;
                const lastName = document.getElementById('swal-input2').value;
                const status = document.querySelector('input[name="swal-radio"]:checked');

                if (!firstName || !lastName || !status) {
                    Swal.showValidationMessage('Please fill out all fields');
                    return;
                }

                return [firstName, lastName, status.value];
            },
        });

        if (formValues) {
            const [firstName, lastName, status] = formValues;
            // Update contact data in localStorage
            const updatedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            updatedContacts[index] = { firstName, lastName, status };
            localStorage.setItem('contacts', JSON.stringify(updatedContacts));

            // Display contact data from localStorage
            console.log('Updated Contacts stored in localStorage:', updatedContacts);
            setContacts(updatedContacts);

            Swal.fire({
                title: 'Contact Updated!',
                html: `
                    <p>First Name: ${firstName}</p>
                    <p>Last Name: ${lastName}</p>
                    <p>Status: ${status}</p>
                `,
                icon: 'success',
            });
        }
    };

    // delete contact 
    const handleDeleteClick = (index) => {
        // Perform delete operation using the index
        // Update the contacts array and update localStorage
        const updatedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        updatedContacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        setContacts(updatedContacts);

        // Update your component's state or trigger a re-render
        // to reflect the changes in the UI
    };


    return (
        <div>
            <button className="bg-indigo-500 text-white p-3 rounded-md" onClick={handleCreateContact}>Create Contact</button>
            {/* if contacts not available */}
            {contacts.length === 0 ? (
                <div className="p-10 border border-red-600 w-1/2 mx-auto text-center">
                    <p className="text-3xl">
                        No contacts found. Please add contacts using the Create Contact button.
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-3 gap-5 mt-10'>
                    {
                        contacts.map((contact, i) => (
                            <div key={i} className='p-5 rounded-lg shadow-lg bg-gray-800 text-white'>
                                <div className='space-y-3 text-lg'>
                                    <p><span className='font-semibold'>First Name:</span> {contact.firstName}</p>
                                    <p><span className='font-semibold'>Last Name:</span> {contact.lastName}</p>
                                    <p><span className='font-semibold'>Status:</span> <span className={contact.status === 'Active' ? 'text-green-600' : 'text-red-600'}>{contact.status}</span></p>
                                </div>

                                <div className='flex justify-between items-center mt-5'>
                                    <button
                                        className="bg-yellow-500 text-white p-3 px-5 rounded-md"
                                        onClick={() => handleEditClick(i)} // Call a function to handle edit click
                                    >
                                        <FiEdit className="h-5 w-5" />
                                    </button>
                                    <button
                                        className="bg-red-600 text-white p-3 rounded-md"
                                        onClick={() => handleDeleteClick(i)} // Call a function to handle delete click
                                    >
                                        <FiTrash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))

                    }
                </div>
            )}

        </div>
    );
};

export default Contact;