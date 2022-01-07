import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../Utilities/Wrapper";
import Product from "./Product";
import Container from "react-bootstrap/Container";
import Pagination from "../Utilities/Pagination";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../StyleSheet/Common.module.css";

const ProductList = () => {
  const [searchResults, setSearchResults] = useState([]);

  //getting products data from reducer
  const productPerPage = useSelector(
    (state) => state.productReducer.productPerPage
  );

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

  return (
    <>
      <Wrapper>
        <Container className={styles.pageHeight}>
          <Row>
            {searchResults.length > 0 ? (
              searchResults.map((product) => {
                return (
                  <Col xs={12} sm={6} md={5} lg={4} xl={3} key={product.id}>
                    <Product data={product} />
                  </Col>
                );
              })
            ) : (
              <h1 className="text-center mt-5">No Products Found</h1>
            )}
          </Row>
        </Container>
      </Wrapper>
      {searchTerm === "" && <Pagination />}
    </>
  );
};

export default ProductList;
