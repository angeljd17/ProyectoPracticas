import { StyleSheet } from 'react-native';

export const DetalleStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  movieImage: {
    aspectRatio: 3 / 2,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  textXL: {
    fontSize: 24,
  },
  textLG: {
    fontSize: 20,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  mb5: {
    marginBottom: 5,
  },
  movieName: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  movieDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
  ratingContainer: {
    marginBottom: 10,
  },
  commentsContainer: {
    marginVertical: 10,
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: 'gray',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  likeText: {
    marginLeft: 5,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
