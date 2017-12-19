import React from 'react';

class ContentIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let subtree = null;
        if (this.props.content.children) {
          subtree = this.props.content.children.map((child,idx) =>
                        <ContentIndex key={child.name} content={child} currentLevel={this.props.currentLevel + 1} indexString={this.props.indexString + "." + idx}/>
                    );
        }
        if(this.props.currentLevel === 0 && !this.props.indexString){
          return (
            <div style={{marginLeft: this.props.currentLevel*10+'px'}} className="tree-node">
              <div className="content-index-line content-index-parent">
              <p className="content-index-name">
                {this.props.content.name}
              </p>
              <p className="content-index-page">
                {this.props.content.page}
              </p>
              </div>
            </div>
          );
        }
        if (subtree) {
          return (
            <div style={{marginLeft: this.props.currentLevel*10+'px'}} className="tree-node">
              <div className="content-index-line content-index-parent">
              <p className="content-index-name" data-id={this.props.content.name}>
                {this.props.indexString}
              </p>
              <p className="content-index-name">
                {this.props.content.name}
              </p>
              <p className="content-index-page">
                {this.props.content.page}
              </p>
              </div>
                <div>
                    {subtree}
                </div>
            </div>
          );
        }
        else {
          return (
            <div style={{marginLeft: this.props.currentLevel*10+'px'}} className="tree-node-leaf">
              <div className="content-index-line">
                <p className="content-index-name" data-id={this.props.content.name}>
                  {this.props.indexString}
                </p>
                <p className="content-index-name">
                  {this.props.content.name}
                </p>
                <p className="content-index-page">
                  {this.props.content.page}
                </p>
              </div>
            </div>
        );
        }


    }
};

export default ContentIndex
