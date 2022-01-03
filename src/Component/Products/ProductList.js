import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../Utilities/Wrapper";
import Product from "./Product";
import Container from "react-bootstrap/Container";
//import Pagination from "../Utilities/Pagination";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [searchResults, setSearchResults] = useState([]);

  //getting products data from reducer
  const products = useSelector((state) => state.productReducer.products);
  //getting search text from reducer
  const searchTerm = useSelector((state) => state.searchReducer.search);

  //functionality for rendering products data by search text
  useEffect(() => {
    if (searchTerm !== "") {
      const searchedProductsList = products.filter((product) => {
        return Object.values(product)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(searchedProductsList);
    } else {
      setSearchResults(products);
    }
  }, [searchTerm]);

  let productsToRender = [];
  if (searchResults.length < 1) {
    productsToRender = products;
  } else {
    productsToRender = searchResults;
  }

  return (
    <Wrapper>
      <Container>
        <Row>
          {productsToRender.map((product) => {
            return (
              <Col xs={12} sm={6} md={3} key={product.id}>
                <Product data={product} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ProductList;
