// Ethiopian University Categories
const ethiopianCategories = [
  {
    id: 1,
    name: 'Computer Science',
    quantity: '12',
    image: '/assets/category/01.png',
  },
  {
    id: 2,
    name: 'Information Systems',
    quantity: '8',
    image: '/assets/category/02.png',
  },
  {
    id: 3,
    name: 'Software Engineering',
    quantity: '15',
    image: '/assets/category/03.png',
  },
  {
    id: 4,
    name: 'Data Science',
    quantity: '10',
    image: '/assets/category/04.png',
  },
  {
    id: 5,
    name: 'Artificial Intelligence',
    quantity: '6',
    image: '/assets/category/05.png',
  },
  {
    id: 6,
    name: 'Web Development',
    quantity: '9',
    image: '/assets/category/06.png',
  },
];

export async function getCategories() {
  // Return dummy data instead of making API call
  return ethiopianCategories;
}
