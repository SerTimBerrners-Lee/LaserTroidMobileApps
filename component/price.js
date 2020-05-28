
const arrTovar = [];
var GlobPrice = 0;

export const Price = (props) => {
    arrTovar.push(props.json);
    GlobPrice = GlobPrice + props.json.price;

    return arrTovar;
} 