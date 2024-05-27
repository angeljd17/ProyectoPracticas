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
});
