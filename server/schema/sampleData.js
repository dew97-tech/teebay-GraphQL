// Products
const products = [
    {
        id: '1',
        title: 'iPhone X',
        description: '64GB, Silver, Unlocked',
        price: 800,
        categories: ['Electronics'],
        imageUrl: 'https://via.placeholder.com/250x250.png?text=iPhone+X',
        isAvailable: true,
        clientId: '1',
    },
    {
        id: '2',
        title: 'MacBook Pro',
        description: '16 inch, 512GB, Space Gray',
        price: 2500,
        categories: ['Electronics'],
        imageUrl: 'https://via.placeholder.com/250x250.png?text=MacBook+Pro',
        isAvailable: true,
        clientId: '5',
    },
    {
        id: '3',
        title: 'Sofa Set',
        description: '3-piece, leather, black',
        price: 1000,
        categories: ['Furniture', 'Outdoor'],
        imageUrl: 'https://via.placeholder.com/250x250.png?text=Sofa+Set',
        isAvailable: true,
        clientId: '4',
    },
    {
        id: '4',
        title: 'Outdoor Tent',
        description: '6-person, waterproof, green',
        price: 200,
        categories: ['Outdoor', 'Furniture'],
        imageUrl: 'https://via.placeholder.com/250x250.png?text=Outdoor+Tent',
        isAvailable: true,
        clientId: '3',
    },
    {
        id: '5',
        title: 'Bicycle',
        description: '26-inch, Mountain Bike, Blue',
        price: 400,
        categories: ['Sporting Goods'],
        imageUrl: 'https://via.placeholder.com/250x250.png?text=Bicycle',
        isAvailable: true,
        clientId: '2',
    },
];

// Clients
const clients = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '123-456-7890',
    },
    {
        id: '2',
        name: 'Jane Doe',
        email: 'jane.doe@email.com',
        phone: '098-765-4321',
    },
    {
        id: '3',
        name: 'Bob Smith',
        email: 'bob.smith@email.com',
        phone: '111-111-1111',
    },
    {
        id: '4',
        name: 'Emily Johnson',
        email: 'emily.johnson@email.com',
        phone: '222-222-2222',
    },
    {
        id: '5',
        name: 'Michael Davis',
        email: 'michael.davis@email.com',
        phone: '333-333-3333',
    },
];

module.exports = { products, clients };
