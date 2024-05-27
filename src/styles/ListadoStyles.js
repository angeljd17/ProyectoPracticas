import { StyleSheet } from 'react-native';

export const listadoStyles = StyleSheet.create({
  movieContainerLight: {
    flexDirection: 'row',
    marginBottom: 8,
    borderBottomWidth: 2,
    paddingBottom: 4,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  movieContainerDark: {
    flexDirection: 'row',
    marginBottom: 8,
    borderBottomWidth: 2,
    paddingBottom: 4,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#212121',
    borderRadius: 8,
    padding: 8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  movieTitleDark: {
    color: 'white',
  },
  movieInfo: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  movieInfoDark: {
    color: 'white',
  },
  movieDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: 'black',
  },
  movieDescriptionDark: {
    color: 'white',
  },
  likeCount: {
    marginLeft: 5,
    color: 'black',
  },
  likeCountDark: {
    color: 'white',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#6200EE',
  },
  toolbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 5,
    fontSize: 18,
    color: 'white',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
});
