import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../Utilities/Wrapper";
import Product from "./Product";
import Container from "react-bootstrap/Container";
import Pagination from "../Utilities/Pagination";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [searchResults, setSearchResults] = useState([]);

  //getting products data from reducer
  const productPerPage = useSelector(
    (state) => state.productReducer.productPerPage
  );
  console.log(productPerPage[0]);
  //getting search text from reducer
  const searchTerm = useSelector((state) => state.searchReducer.search);

  //functionality for rendering products data by search text
  useEffect(() => {
    if (searchTerm !== "") {
      const searchedProductsList = productPerPage.filter((product) => {
        return Object.values(product)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(searchedProductsList);
    } else {
      setSearchResults(productPerPage);
    }
  }, [searchTerm, productPerPage]);

  // let productsToRender = [];
  // if (searchResults.length < 1) {
  //   productsToRender = productPerPage;
  // } else {
  //   productsToRender = searchResults;
  // }
  // console.log(productsToRender[0]);
  console.log(productPerPage[0], "uyi");
  return (
    <>
      <Wrapper>
        <Container>
          <Row>
            {searchResults.length < 1
              ? productPerPage.map((product) => {
                  return (
                    <Col xs={12} sm={6} md={3} lg={3} key={product.id}>
                      <Product data={product} />
                    </Col>
                  );
                })
              : searchResults.map((product) => {
                  return (
                    <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <Product data={product} />
                    </Col>
                  );
                })}
          </Row>
        </Container>
      </Wrapper>
      <Pagination />
    </>
  );
};

export default ProductList;
