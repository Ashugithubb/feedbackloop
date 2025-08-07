// import { Seeder } from '@jorgebodega/typeorm-seeding';
// import { DataSource } from 'typeorm';
// import { Restaurant } from '../../restaurant/entities/restaurant.entity';
// import { User } from '../../users/entities/user.entity';
// import { faker } from '@faker-js/faker';
// import { Role } from '../../users/enum/user.enum';

// export default class RestaurantSeeder implements Seeder {
//   async run(dataSource: DataSource): Promise<void> {
//     const restaurantRepo = dataSource.getRepository(Restaurant);
//     const userRepo = dataSource.getRepository(User);

//     // Get users with Role.OWNER
//     const owners = await userRepo.find({
//       where: { role: Role.OWNER },
//     });

//     if (owners.length === 0) {
//       console.warn('⚠️ No restaurant owners found. Seed users with Role.OWNER first.');
//       return;
//     }

//     const restaurants: Restaurant[] = [];

//     for (let i = 0; i < 10; i++) {
//       const randomOwner = faker.helpers.arrayElement(owners);

//       restaurants.push(
//         restaurantRepo.create({
//           name: faker.company.name(), // Consider adding a name if Restaurant has it
//           description: faker.company.catchPhrase(),
//           address: faker.location.streetAddress(),
//           owner: randomOwner,
//         }),
//       );
//     }

//     await restaurantRepo.save(restaurants);
//     console.log('✅ 10 Restaurants seeded.');
//   }
// }
