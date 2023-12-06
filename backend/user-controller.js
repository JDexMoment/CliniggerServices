const users = [
    { telephone: '+79106648301', name: 'Evgeny', id: 1 },
    { telephone: '+79109715064', name: 'Masha', id: 2 },
];

const getNextId = () => {
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
};

const getUsers = (req, res) => {
    if (req.params.id) {
        return res.send(users.find(user => user.id == req.params.id));
    }
    res.send(users);
};

const createUser = (req, res) => {
    const user = req.body;
    user.id = getNextId();
    users.push(user);
    res.send(user);
};

module.exports = {
    getUsers,
    createUser,
};
