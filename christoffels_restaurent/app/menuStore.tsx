export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

// Global array holding preset starter data elements for application screens
export let menuItems: MenuItem[] = [
  { id: '1', name: 'BBQ Chicken Wings', description: '8 Tender chicken wings tossed in a smoky homemade sauce, served with celery sticks and blue cheese dip.', course: 'Starters', price: '65' },
  { id: '2', name: 'Grilled Ribeye', description: '300g prime cut ribeye grilled to your liking, served with roasted veg and creamy mash.', course: 'Main courses', price: '285' },
  { id: '3', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten centre, vanilla ice-cream.', course: 'Desserts', price: '75' },
];

// Prepends new items to the top of the collection list array
export function addMenuItem(item: MenuItem) {
  menuItems.unshift(item);
}