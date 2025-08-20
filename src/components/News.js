import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
    country: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async componentDidMount() {
    this.updateNews();
  }
  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(10);
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    let uniqueArticles = parsedData.articles.filter(
      (a, index, self) => index === self.findIndex((t) => t.url === a.url)
    );

    this.setState({
      articles: uniqueArticles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        // Deduplicate before setting
        let uniqueArticles = parsedData.articles.filter(
          (a, index, self) => index === self.findIndex((t) => t.url === a.url)
        );

        this.setState({
          articles: this.state.articles.concat(uniqueArticles),
          totalResults: parsedData.totalResults,
          loading: false,
        });
      }
    );
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "30px 0px", marginTop: "90px" }}
        >
          {`NewsMonkey Top-Headlines from  ${this.capitalizeFirstLetter(
            this.props.category
          )}`}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className=" row">
              {!this.state.loading &&
                this.state.articles.map((element) => {
                  return (
                    <div
                      className="col-md-4"
                      key={element.url || element.publishedAt + element.title}
                    >
                      <NewsItem
                        title={element.title ? element.title.slice(0, 44) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://media.cnn.com/api/v1/images/stellar/prod/2012-01-10t120000z-577591873-gm1e81b0hjr01-rtrmadp-3-kodak.JPG?c=16x9&q=w_800,c_fill"
                        }
                        newsUrl={element.url}
                        author={element.author}
                        publishedAt={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
