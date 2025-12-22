const { ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } =
  require('@aws-sdk/lib-dynamodb');
const ddbDocClient = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = 'EventsTable';

const listEvents = async (filters) => {
  // Simple scan + filter in memory (fine for mini-project)
  const command = new ScanCommand({
    TableName: TABLE_NAME
  });
  const data = await ddbDocClient.send(command);
  let items = data.Items || [];

  if (filters.department) {
    items = items.filter((it) => it.department === filters.department);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    items = items.filter((it) =>
      (it.title || '').toLowerCase().includes(s)
    );
  }

  items.sort((a, b) => {
    const da = a.date || '';
    const db = b.date || '';
    return da.localeCompare(db);
  });

  return items;
};

const getEventById = async (id) => {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id }
  });
  const data = await ddbDocClient.send(command);
  return data.Item;
};

const createEvent = async (eventData) => {
  const id = uuidv4();
  const item = {
    id,
    title: eventData.title,
    description: eventData.description,
    venue: eventData.venue,
    department: eventData.department,
    date: eventData.date,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    organizer: eventData.organizer,
    capacity: Number(eventData.capacity) || 0,
    registeredCount: 0,
    isOnline: !!eventData.isOnline,
    registrationLink: eventData.registrationLink || ''
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item
  });

  await ddbDocClient.send(command);
  return item;
};

const updateEvent = async (id, eventData) => {
  const existing = await getEventById(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...eventData
  };
  if (eventData.capacity !== undefined) {
    updated.capacity = Number(eventData.capacity);
  }

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: updated
  });
  await ddbDocClient.send(command);
  return updated;
};

const deleteEvent = async (id) => {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id }
  });
  await ddbDocClient.send(command);
  return true;
};

module.exports = {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
