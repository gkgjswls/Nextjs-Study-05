import fs from 'fs/promises';
import path from 'path';
const ProductDetail = (props) =>{
  const {loadedProduct} = props;
  if(!loadedProduct){
    return <p> Loading ...</p>
  }
  return (
    <>
    <h1>{loadedProduct.title}</h1>
    <p>{loadedProduct.description}</p>
    </>
  )


} 
const getData = async() =>{
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data
}

export const getStaticProps = async(context) =>{
  const {params} = context;
  const productId = params.pid;
  const data = await getData();

  
  const product = data.products.find(product=> product.id === productId)
  if(!product){
    return {
      notFound: true
    }
  }
  return {
    props: {
      loadedProduct: product

    }
  }
}
export const getStaticPaths = async() =>{
  const data = await getData();
  const pathsWithparams = data.products.map(product=>({params: {pid: product.id}}))
  
  return {
    paths: pathsWithparams,
    fallback: true,
  }
}
export default ProductDetail;