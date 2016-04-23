import React from "react";

export default class NewCardForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  toggleExpander() {
    this.setState({expanded: !this.state.expanded})
  }

  expanderClassName() {
    const base = "expander-trigger new-card-form-expander";
    if (this.state.expanded == true)
      return(base);
    else
      return(base + " expander-hidden");
  }

  onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const newCard = {
      path:             form.path.value,
      card_type:        form.card_type.value,
      title:            form.title.value,
      author_name:      form.author_name.value,
      author_url:       form.author_url.value,
      provider_name:    form.provider_name.value,
      provider_url:     form.provider_url.value,
      cache_age:        form.cache_age.value,
      thumbnail_url:    form.thumbnail_url.value,
      thumbnail_width:  form.thumbnail_width.value,
      thumbnail_height: form.thumbnail_height.value,
      version:          form.version.value,
      height:           form.height.value,
      width:            form.width.value,
      html:             form.html.value
    };

    this.props.onSubmit(newCard);
    this.setState({expanded: false})
  }

  render() {
    return(
      <div className="expander">
        <a href="javascript:void(0)"
          onClick={this.toggleExpander.bind(this)}
          className={this.expanderClassName()}>
          Add Card
        </a>
        <div className="form fieldset new-card-form expander-content">
          <form onSubmit={this.onSubmit.bind(this) }>
            <label htmlFor="path">Path</label>
            <input name="path" id="path" type="text" />
            <label htmlFor="card_type">Type</label>
            <input name="card_type" id="card_type" type="text" />
            <label htmlFor="title">Title</label>
            <input name="title" id="title" type="text" />
            <label htmlFor="author_name">Author Name</label>
            <input name="author_name" id="author_name" type="text" />
            <label htmlFor="author_url">Author Url</label>
            <input name="author_url" id="author_url" type="text" />
            <label htmlFor="provider_name">Provider Name</label>
            <input name="provider_name" id="provider_name" type="text" />
            <label htmlFor="provider_url">Provider Url</label>
            <input name="provider_url" id="provider_url" type="text" />
            <label htmlFor="cache_age">Cache Age</label>
            <input name="cache_age" id="cache_age" type="text" />
            <label htmlFor="thumbnail_url">Thumb Url</label>
            <input name="thumbnail_url" id="thumbnail_url" type="text" />
            <label htmlFor="thumbnail_width">Thumb Width</label>
            <input name="thumbnail_width" id="thumbnail_width" type="text" />
            <label htmlFor="thumbnail_height">Thumb Height</label>
            <input name="thumbnail_height" id="thumbnail_height" type="text" />
            <label htmlFor="version">Version</label>
            <input name="version" id="version" type="text" />
            <label htmlFor="height">Height</label>
            <input name="height" id="height" type="text" />
            <label htmlFor="width">Width</label>
            <input name="width" id="width" type="text" />
            <label htmlFor="html">HTML</label>
            <input name="html" id="html" type="text" />

            <input name="submit" id="submit" type="submit" value="Add" />
          </form>
        </div>
      </div>
    );
  }
}

NewCardForm.propTypes = {
  expanded: React.PropTypes.bool,
  onSubmit: React.PropTypes.func.isRequired
}
