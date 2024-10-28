import { faker } from '@faker-js/faker';
import Email from '../consts/Email';

export const getRandomEmailByUsername = (firstName: string, lastName:string): string => {
    return faker.internet.email(firstName,lastName);
};
