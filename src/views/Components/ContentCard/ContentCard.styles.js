const styles = theme => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: "30%",
    height: 250
  },
  cardDescription: {
    display: 'box',
    lineClamp: '3',
    boxOrient: 'vertical',
    overflow: 'hidden',
  }
});

export default styles