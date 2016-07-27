class ArticleCover extends React.Component {

  constructor (props) {

    super(props);

    this.state = {
      edit: false
    }
  }

  handleClick (event) {

      this.setState({'edit': true})

      event.preventDefault();
      event.stopPropagation();
  }

  render () {

    const form = (
       <form method="POST"
             encType="multipart/form-data"
             acceptCharset="UTF-8"
             action="/articles/cover">

           <input type="hidden" name="id" value={this.props.permalink} />
           <input type="file"
              accept="image/*"
              name="cover" />
          <input type="submit" value="Save" />
       </form>
    )

    const link = (
      <a href="#" onClick={this.handleClick.bind(this)}>Add Cover</a>
    )

    var current = link;
    if (this.state.edit) {
        current = form;
    }

    return (
      <div className="add-cover">
        {current}
      </div>
    );
  }
}

ArticleCover.propTypes = {
  url: React.PropTypes.string
};
