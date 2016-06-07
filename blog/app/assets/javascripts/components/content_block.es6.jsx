class ContentBlock extends React.Component {
  render () {
    return (
      <section className="content-blocks">
        <div className="article-content-type" >
            <ul>
                <li className="video"><a></a></li>
                <li className="photo"><a></a></li>
                <li className="code"><a></a></li>
                <li className="paragraph"><a></a></li>
            </ul>
        </div>
      </section>
    );
  }
}

ContentBlock.propTypes = {
  contentType: React.PropTypes.array
};
