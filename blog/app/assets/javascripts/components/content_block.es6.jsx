class ContentBlock extends React.Component {

  itemClick (event) {

    console.log(event.currentTarget.parentNode.className);
  }

  render () {
    return (
      <section className="content-blocks">
        <div className="article-content-type" >
            <ul>
                <li className="video"><a href="#" onClick={this.itemClick}></a></li>
                <li className="photo"><a href="#" onClick={this.itemClick}></a></li>
                <li className="code"><a href="#" onClick={this.itemClick}></a></li>
                <li className="paragraph"><a href="#" onClick={this.itemClick}></a></li>
            </ul>
        </div>
      </section>
    );
  }
}

ContentBlock.propTypes = {
  contentType: React.PropTypes.array
};
