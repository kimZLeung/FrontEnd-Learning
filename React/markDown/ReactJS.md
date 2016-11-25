# ReactJS

标签（空格分隔）： ReactJS

---

    var CommentBox = React.createClass({
      render: function() {
        return (
          <div className="commentBox">
            Hello, world! I am a CommentBox.
          </div>
        );
      }
    });
    React.renderComponent(
      <CommentBox />,
      document.getElementById('content')
    );

---
    var CommentBox = React.createClass({
      getInitialState: function() {
        return {data: []};
      },
      render: function() {
        return (
          <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
            <CommentForm />
          </div>
        );
      }
    });

- 到目前為止每一個元件都根據自身的 props 取得的資料渲染了一次，props 本身是靜態不會變動的。它們從父元素取得，而且是父元素擁有的。為了完成互動功能，需要-元件的狀態屬性 this.state 。這個屬性本身是 private ，只能透過呼叫 this.setState() 去更改。當狀態改變的時候，元件就會重新渲染輸出。

- props不能修改，不过可以先定义一个

    var props = {foo:'default'};
    var component = <component {...props} foo='override' />;
    console.log(component.props.foo) // 'override'
    


----------


- 正常来说应该尽可能地减少state 
- “ think about the minimal possible representation of its state！！~！！”
- 不应该使用state ： 可通过state本身的属性计算出的数据，本身的props的属性，从props中来的数据(与props相关的)


----------
## 多个组件
- 一个组件可以包含另一个组件
- Parent可以通过this.props.children来访问儿子
- Parent和Children关系与Owner和Ownee关系不一样

--- 
## 关于ref
- ref可以传入字符串。然后通过this.refs.[param]来访问这个DOM节点
- ref也可以传回调函数，会在组件挂载之后立即执行。并且该回调函数的参数就是真实的DOM节点