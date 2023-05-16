import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

class App extends React.Component {
  state = {
    searchName: '',
    images: [],
    perPage: 12,
    page: 1,
    isLoading: false,
    isVisible: false,
  };

  formSubmitHandler = searchName => {
    this.setState({ isLoading: true, isVisible: true, page: 1 });
    fetch(
      `https://pixabay.com/api/?q=${searchName}&page=1&key=34736724-43de875ebed23001707db1297&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          searchName,
          images: data.hits.map(image => ({
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          })),
          isLoading: false,
        })
      );
  };

  onAddImages = () => {
    const { searchName, page, perPage } = this.state;
    const nextPage = page + 1;
    this.setState({ isLoading: true });
    fetch(
      `https://pixabay.com/api/?q=${searchName}&page=${nextPage}&key=34736724-43de875ebed23001707db1297&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState(prevState => ({
          images: [
            ...prevState.images,
            ...data.hits.map(image => ({
              id: image.id,
              webformatURL: image.webformatURL,
              largeImageURL: image.largeImageURL,
              tags: image.tags,
            })),
          ],
          page: nextPage,
          isLoading: false,
        }))
      );
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery
          searchName={this.state.searchName}
          perPage={this.state.perPage}
          images={this.state.images}
        />
        <ToastContainer autoClose={3000} theme="colored" />
        {this.state.isLoading && <Loader />}
        {this.state.isVisible &&
          this.state.images.length % this.state.perPage === 0 &&
          this.state.images.length > 0 && (
            <Button
              onClick={this.onAddImages}
              isVisible={this.state.isVisible}
            />
          )}
      </div>
    );
  }
}

export default App;
