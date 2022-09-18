import img1 from '../static/image/1.png'
import img2 from '../static/image/2.png'
import img3 from '../static/image/3.png'
import img4 from '../static/image/4.png'

const ProductCate = () => {
  return (
    <div id="product-cate">
      <ProductCateBlock img={img1}></ProductCateBlock>
      <ProductCateBlock img={img2}></ProductCateBlock>
      <ProductCateBlock img={img3}></ProductCateBlock>
      <ProductCateBlock img={img4}></ProductCateBlock>
    </div>
  )
}

const ProductCateBlock = (img) => {
  return (
    <div className="product-cate-block">
      <img src={img} width='300' height="300"></img>
    </div>
  )
}

export default ProductCate