//These lines of code prepare your application to use Express.js and GraphQL. 
//They import the necessary modules and types needed to create a GraphQL server and set up an Express application.

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');
const app = express();

// An example of a source
const customers = [
  { id: '1', name: 'Asiakas 1', email: 'asiakas1@example.com' },
  { id: '2', name: 'Asiakas 2', email: 'asiakas2@example.com' },
];

const cars = [
  { id: '1', make: 'Toyota', model: 'Camry' },
  { id: '2', make: 'Honda', model: 'Civic' },
];

// GraphQL-Types
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const CarType = new GraphQLObjectType({
  name: 'Car',
  fields: {
    id: { type: GraphQLID },
    make: { type: GraphQLString },
    model: { type: GraphQLString },
  },
});

// GraphQL-input-tyyppi asiakkaan lisäämiseen
const CustomerInputType = new GraphQLInputObjectType({
  name: 'CustomerInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
  },
});

// GraphQL-input-tyyppi auton lisäämiseen
const CarInputType = new GraphQLInputObjectType({
  name: 'CarInput',
  fields: {
    make: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
  },
});

// Päivitetty CustomerInputType sallimaan usean asiakkaan lisäämisen
const MultiCustomerInputType = new GraphQLInputObjectType({
  name: 'MultiCustomerInput',
  fields: {
    customers: { type: new GraphQLList(CustomerInputType) },
  },
});


//Add the appropriate query to the RootQueryType.For example: name it customers and specify how it retrieves customer information
//Fetching all customers from a query

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllCustomers: {
      type: GraphQLString,
      resolve: () => 'All customers!',
    },
    
    customers: {
      type: new GraphQLList(CustomerType),
      resolve: () => customers,
    },
    
    //This code defines a simple GraphQL field called "getAllCars" that returns the fixed string 'All cars!' whenever asked.
    getAllCars: {
      type: GraphQLString,
      resolve: () => 'All cars!',
    },

    //Here is the resolver fetching all the cars on the screen
    cars: {
      type: new GraphQLList(CarType),
      resolve: () => cars,
    },

   // Fetching a customer by it's ID
    customer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const { id } = args;
        return customers.find((customer) => customer.id === id);
      },
    },

    // Fetching a car by it's ID
    car: {
      type: CarType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const { id } = args;
        return cars.find((car) => car.id === id);
      },
    },
  },
  // ...
});



//Add the appropriate query to the RootQueryType. You can name it customers and cars and specify how it retrieves customer or car information
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Lisätään päivitysmutaatioita...
     //Adding multiple customers
    addCustomers: {
      type: new GraphQLList(CustomerType),
      description: 'Add new customers',
      args: {
        customers: { type: new GraphQLList(CustomerInputType) },
      },
      resolve: (parent, args) => {
        const { customers: newCustomers } = args;
        const addedCustomers = newCustomers.map((customer) => {
          const newId = String(customers.length + 1); // Luo uusi ID
          const newCustomer = { id: newId, ...customer };
          customers.push(newCustomer);
          return newCustomer;
        });

        return addedCustomers;
      },
    },

 addCars: {
  type: new GraphQLList(CarType), // Palautetaan lisätyt autot
  description: 'Add new cars',
  args: {
    cars: { type: new GraphQLList(CarInputType) }, // Voit lähettää useita autoja
  },
  resolve: (parent, args) => {
    const { cars: newCars } = args;

    // Lisää uudet autot tietolähteeseen
    const addedCars = newCars.map((car) => {
      const newId = String(cars.length + 1); // Luo uusi ID
      const newCar = { id: newId, ...car };
      cars.push(newCar);
      return newCar;
    });

    return addedCars;
  },
},

   //Updates a customer data
   updateCustomer: {
    type: CustomerType,
    description: 'Update a customer',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    resolve: (parent, args) => {
      const { id, name, email } = args;
      const customerToUpdate = customers.find((customer) => customer.id === id);
      if (!customerToUpdate) {
        throw new Error(`Could not Find ${id} the customer ID`);
      }
  
      if (name) {
        customerToUpdate.name = name;
      }
      if (email) {
        customerToUpdate.email = email;
      }
  
      return customerToUpdate;
    },
  },

    //Updates a car data
    updateCar: {
    type: CarType,
    description: 'Update a car',
    args: {
     id: { type: new GraphQLNonNull(GraphQLID) },
     make: { type: GraphQLString },
     model: { type: GraphQLString },
    },
    resolve: (parent, args) => {
      const { id, make, model } = args;
      const carToUpdate = cars.find((car) => car.id === id);
       if (!carToUpdate) {
        throw new Error(`Autoa ID: ${id} ei löytynyt`);
      }

    if (make) {
      carToUpdate.make = make;
    }
    if (model) {
      carToUpdate.model = model;
    }

    return carToUpdate;
  },
},

  //Deletes a customer
    deleteCustomer: {
      type: CustomerType,
      description: 'Delete a customer',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const { id } = args;
        const customerIndex = customers.findIndex((customer) => customer.id === id);
        if (customerIndex !== -1) {
          const deletedCustomer = customers.splice(customerIndex, 1)[0];
          return deletedCustomer;
        } else {
          throw new Error(`Asiakasta ID: ${id} ei löytynyt`);
        }
      },
    },

    //Deletes a car
    deleteCar: {
      type: CarType,
      description: 'Delete a car',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const { id } = args;
        const carIndex = cars.findIndex((car) => car.id === id);
        if (carIndex !== -1) {
          const deletedCar = cars.splice(carIndex, 1)[0];
          return deletedCar;
        } else {
          throw new Error(`Autoa ID: ${id} ei löytynyt`);
        }
      },
    },
  },
});

//A schema for a query and mutation
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

// GraphQL-reitti
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

//Starts the server at the localhost:3000 GraphQL webpage
app.listen(3000, () => {
  console.log('Palvelin käynnistetty osoitteessa http://localhost:3000/graphql');
});
