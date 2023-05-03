import fs from 'fs/promises';
import path from 'path';
export const getStaticProps = async(context) =>{
  console.log('(RE-)Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  if(!data){
    return {
      redirect: {
        destination: '/no-data'  
      }
    }
  }
  if(data.products.length === 0){
    return {notFound: true}
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    notFound: false, //boolean T or F 404Page rendering

  }
}
export default function Home(props) {
  const {products} = props;
  return (
    <ul>
      {products.map((product)=><li key={product.id}>{product.title}</li>)}
    </ul>
  )
}
