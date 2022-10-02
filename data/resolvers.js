import { reject } from 'lodash';
import { Widgets } from './dbConnectors';

export const resolvers = {
    getProduct: ({ id }) => {
        return new Promise((resolve) => {
            Widgets.findById({ _id: id }, (err, product) => {
                if (err) reject(err)
                else resolve(product)
            })
        });
    },
    getAllProducts: () => {
        return Widgets.find({})
    },
    createProduct: ({ input }) => {
        const newWidget = new Widgets({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores,
        });

        newWidget.id = newWidget._id;

        return new Promise((resolve) => {
            newWidget.save((err) => {
                if (err) reject(err)
                else resolve(newWidget)
            });
        });
    },
    updateProduct: ({ input }) => {
        return new Promise((resolve) => {
            Widgets.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, widget) => {
                if (err) reject(err)
                else resolve(widget)
            })
        })
    },
    deleteProduct: ({ id }) => {
        return new Promise((resolve) => {
            Widgets.remove({ _id: id }, (err) => {
                if (err) reject(err)
                else resolve('Successfully deleted widget')
            })
        })
    }
};

export default resolvers;
