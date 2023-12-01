const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

class Contacts {
  constructor(path) {
    this.path = path;
  }

  async read() {
    const data = await fs.readFile(this.path);
    return JSON.parse(data.toString());
  }

  async listContacts() {
    return await this.read();
  }

  async getContactById(id) {
    const contacts = await this.read();
    const contact = contacts.find(itm => itm.id === id);
    return contact || null;
  }

  async removeContact(contactId) {
    const contacts = await this.read();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      console.log(`User with id ${contactId} not found`);
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    const dataString = JSON.stringify(contacts, null, 2);
    await fs.writeFile(this.path, dataString);
    return removedContact;
  }

  async addContact(data) {
    const contacts = await this.read();
    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.push(newContact);
    const dataString = JSON.stringify(contacts, null, 2);
    await fs.writeFile(this.path, dataString);
    return newContact;
  }

  async updateContact(contactId, body) {
    const contacts = await this.read();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }

    contacts[index] = { id: contactId, ...body };
    await fs.writeFile(this.path, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }
}
const contacts = new Contacts(contactsPath);

module.exports = contacts;
