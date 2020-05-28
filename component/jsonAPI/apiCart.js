
const ArrayCart = [];

class CART{
    constructor(){
        this.Arrays = ArrayCart;
    }

    addObject = (object) => {
        this.Arrays.push(object)
    }

    deleteProduct = (id) => {
        let newArray = []
        this.Arrays.map((el, index, arr) => {
            if(el.idProduct != id) {
               newArray.push(el)
            }
            if(index === arr.length -1) {
                this.Arrays = newArray
            }
        })
    }

    deleteCart = () => {
        this.Arrays = [];
    }

    returnArray = () => {
        return this.Arrays;
    }
}

export const CARTs = new CART
