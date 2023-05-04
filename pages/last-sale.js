import { useEffect, useState } from 'react';
import  useSWR  from 'swr';

const LastSalesPage=(props)=>{
  // const [sales,setSales] = useState(props.sales);
  // const [isLoading,setIsLoading] = useState(false);

  // useEffect(()=>{
  //   setIsLoading(true)
  //   fetch('https://nextjs-course-cdb64-default-rtdb.firebaseio.com/sales.json')
  //     .then(res=>res.json())
  //     .then(data => {
  //       const transformedSale = [];
  //       for(const key in data){
  //         transformedSale.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume})
  //       }
  //       setSales(transformedSale);
  //       setIsLoading(false);
  //     })
  // },[])

// if(isLoading){
//   return <p>Loading</p>
// }
// if(!sales){
//   return <p>No data yet</p>
// }
const {sales} = props;
if(!sales){
  return <p>no data yet</p>
}

  return (<ul>{sales.map(sale=> <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}</ul>);
}

export default LastSalesPage

export const getStaticProps = async(context) =>{

  const reponse = await fetch('https://nextjs-course-cdb64-default-rtdb.firebaseio.com/sales.json')
  const data = await reponse.json();
  const transformedSale = [];
  for(const key in data){
    transformedSale.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume})
    }
    return {
      props: {
        sales: transformedSale
      },
      revalidate: 10,
    }
    
}