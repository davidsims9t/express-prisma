import { prismaMock } from '../utils/prisma-mock';
import { Context, MockContext, createMockContext } from '../utils/context';
import { createPerson, deletePerson, updatePerson } from '../aggregates/person';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test("Can add a person", async () => {
  const person: CreatePerson = {
    name: 'David',
    birthday: "07/25/1990",
    hometown: 'Santa Rosa, CA'
  };

  const personMock = {
    ...person,
    id: 1,
    birthday: new Date(person.birthday)
  };

  prismaMock.person.create.mockResolvedValue(personMock);

  const createdPerson = await createPerson(person, { prisma: prismaMock });
  expect(createdPerson).toEqual(personMock);
});

test("Can update a person", async () => {
  const person: UpdatePerson = {
    id: 1,
    name: 'David',
    birthday: "07/25/1990",
    hometown: 'Santa Rosa, CA'
  };

  const personMock = {
    ...person,
    birthday: new Date(person.birthday!)
  } as Omit<Person, "birthday"> & { birthday: Date };

  prismaMock.person.update.mockResolvedValue(personMock);

  const updatedPerson = await updatePerson(person, { prisma: prismaMock });
  expect(updatedPerson).toEqual(personMock);
});

test("Can delete a person", async () => {
  const person: DeletePerson = {
    id: 1
  };

  const personMock = {
    id: 1,
    name: 'David',
    birthday: new Date("07/25/1990"),
    hometown: 'Santa Rosa, CA'
  };

  prismaMock.person.delete.mockResolvedValue(personMock);

  const deletedPerson = await deletePerson(person, { prisma: prismaMock });
  expect(deletedPerson).toEqual(personMock);
});