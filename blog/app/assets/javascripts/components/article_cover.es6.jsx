class ArticleCover extends React.Component {

  constructor (props) {

    super(props);

    this.state = {
      edit: false
    }
  }

  handleFileChoose(event) {

      return false;
  }

  handleClick (event) {

      this.setState({'edit': true})

      event.preventDefault();
      event.stopPropagation();
  }

  render () {

    const form = (
       <form method="POST" enctype="multipart/form-data" action="#">
           <label>Choose photo</label>
           <input type="hidden" name="id" value={this.props.permalink} />
           <input type="file"
              accept="image/*"
              onChange={this.handleFileChoose.bind(this)}
              name="cover"/>
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
