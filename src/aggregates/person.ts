import { Context } from '../utils/context';

export async function getPerson(ctx: Context) {
  return await ctx.prisma.person.findFirst();
}

function isInvalidPerson(person: CreatePerson | UpdatePerson) {
  const date = new Date();
  const updatedPerson = person as UpdatePerson;

  if ((!updatedPerson.id || (updatedPerson.id && updatedPerson.name)) && typeof person.name !== "string") {
    return new Error(`Missing field name.`);
  }

  if ((!updatedPerson.id || (updatedPerson.id && updatedPerson.hometown)) && typeof person.hometown !== "string") {
    return new Error(`Missing field hometown.`);
  }

  if ((!updatedPerson.id || (updatedPerson.id && updatedPerson.birthday)) && person.birthday && new Date(person.birthday) >= date) {
    return new Error(`Invalid birth date. Birth date must be before the current time and date.`);
  }
}

export async function createPerson(person: CreatePerson, ctx: Context) {
  const isInvalid = isInvalidPerson(person);
  if (isInvalid) {
    throw isInvalid;
  }

  const { name, hometown } = person;
  const birthday = new Date(person.birthday);

  return await ctx.prisma.person.create({
    data: {
      hometown,
      name,
      birthday
    },
  });
}

export async function updatePerson(person: UpdatePerson, ctx: Context) {
  const isInvalid = isInvalidPerson(person);
  if (isInvalid) {
    throw isInvalid;
  }

  const birthday = person.birthday ? new Date(person.birthday) : undefined;

  return await ctx.prisma.person.update({
    where: {
      id: person.id
    },
    data: {
      ...person,
      birthday
    },
  });
};

export async function deletePerson(person: DeletePerson, ctx: Context) {
  const isInvalid = isInvalidPerson(person);
  if (isInvalid) {
    throw isInvalid;
  }

  return await ctx.prisma.person.delete({
    where: {
      id: person.id
    }
  });
}