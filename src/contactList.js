export default class ContactList {
    /**
     * Simple Contact List class
     */
    constructor() {
        this._list = [];
    }

    /**
     * Check if the new_contact object is a valid new contact
     * Validates, if has the name and phone keys, check if the name is a string
     * and the phone is a number and it has at least 5 digits
     * @param {name:string phone:nubmer} new_contact
     */
    isContactValid(new_contact) {
        if (
            new_contact.hasOwnProperty("name") &&
            new_contact.hasOwnProperty("phone")
        ) {
            if (
                typeof new_contact.name !== "string" ||
                new_contact.name.trim().length === 0
            ) {
                throw new Error(`The contact name ${new_contact.name} is not valid`);
            }
            if (
                typeof new_contact.phone !== "number" ||
                new_contact.phone.toString().length < 5
            ) {
                throw new Error(`The contact phone ${new_contact.phone} is not valid`);
            }
        } else {
            throw new Error("the contact needs to have a name and a phone");
        }
    }

    /**
     * Method for add a contact to the list
     * @param { name: String, phone: number} contact
     */
    add(new_contact) {
        try {
            this.isContactValid(new_contact);
            if (this._list.length === 0) {
                this._list.push(new_contact);
            } else {
                for (let index = 0; index < this._list.length; index++) {
                    const contact = this._list[index];
                    if (contact.name === new_contact.name) {
                        console.log(
                            "A contact with the name " + new_contact.name + " already exists"
                        );
                        break;
                    } else {
                        this._list.push(new_contact);
                        return;
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    remove(name) {
        for (let i = 0; i < this._list.length; i++) {
            const contact = this._list[i];
            if (contact.name === name) {
                this._list.splice(i, 1);
                break;
            } else {
                console.log("There is no contact with the name " + name);
                break;
            };
        };
    }

    removeById(index) {
        this._list.splice(index, 1);
    }

    // searchBy(key, value) {
    //     const result = [];
    //     for (let i = 0; i < this._list.length; i++) {
    //         let eachElement = this._list[i];
    //         if (eachElement.hasOwnProperty(key)) {
    //             if (eachElement[key].toString().toLowerCase().startsWith(value.toString().toLowerCase())) {
    //                 result.push(eachElement);
    //             }
    //         } else {
    //             throw new Error(`Sorry the ${key} does not exists`);
    //         }
    //     }
    //     // console.log(`There is not this contact in your list!`);
    //     return result;
    // }

    searchBy(key, value) {
        return this._list.filter( e => {
            if (e.hasOwnProperty(key)) {
                if (e[key].toString().toLowerCase().startsWith(value.toString().toLowerCase())) {
                    return e;
                }
            } else {
                throw new Error(`the key: ${key} does not exists`)
            }
        })
    }
    
    getList() {
        if (this._list.length === 0) {
            console.log('This List Is Empty!')
        } else {
            return this._list;
        }
    }
}

/* class ContactItem {
   constructor(name, phone) {
     if (typeof name !== "string") {
       throw new Error("name must be a string");
     }
     if (typeof phone !== "number") {
       throw new Error("phone must be a number");
     }
     if (typeof phone.toString().length < 5) {
         throw new Error("phone has to few digits (at least 5)");
     }
     this.name = name;
     this.phone = phone;
   }
 }*/