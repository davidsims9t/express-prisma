type Person = {
    hometown: string;
    birthday: string;
    id: number;
    name: string;
};

type CreatePerson = Omit<Person, "id">;
type UpdatePerson = Partial<Person> & Pick<Person, "id">;
type DeletePerson = Pick<Person, "id">;