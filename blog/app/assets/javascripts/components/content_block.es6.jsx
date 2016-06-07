class ContentBlock extends React.Component {
  render () {
    return (
      <section className="content-blocks">
        <div className="article-content-type" >
            <ul>
                <li>Vídeo</li>
                <li>Foto</li>
                <li>Parágrafo</li>
                <li>Código</li>
            </ul>
        </div>
      </section>
    );
  }
}

ContentBlock.propTypes = {
  contentType: React.PropTypes.array
};
