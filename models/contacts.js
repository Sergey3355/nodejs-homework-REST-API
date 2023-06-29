const fs = require("fs").promises;
const path = require("path");
const { updateFileOperation, tryCatchWrapper } = require("./helpers");


const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = tryCatchWrapper(async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
});

const addContact = tryCatchWrapper(async (body) => {
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    return false;
  }
  const newContact = { id: Date.now().toString(), name, email, phone };

  updateFileOperation(await listContacts(), newContact, contactsPath);
  return newContact;
});

const updateContact = tryCatchWrapper(async ({ id }, body) => {
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    return false;
  }
  const data = await listContacts();

  const changingTheFields = data.reduce((acc, contact) => {
    if (contact.id === id) {
      acc.id = id;
      acc.name = name;
      acc.email = email;
      acc.phone = phone;
    }
    return acc;
  }, {});
  updateFileOperation(data, changingTheFields, contactsPath);
  return changingTheFields;
});

const removeContact = tryCatchWrapper(async (deleteContact) => {
  const data = await listContacts();
  const newContactsArray = data.filter(({ id }) => id !== deleteContact.id);
  await fs.writeFile(contactsPath, JSON.stringify(newContactsArray), "utf-8");
});

listContacts();

module.exports = {
  listContacts,
  removeContact,
  addContact,
  updateContact,
};
