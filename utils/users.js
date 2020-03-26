/* jshint -W117 */
const users = [];

//Join user to chat

function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(users) {
  const index = user.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1);
  }
}
//Get room Users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
