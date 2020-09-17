const Cash = props => {
  const value = ((props.cash / props.ratio) * props.price).toFixed(2);
  return (
    <div>
      {props.title}
      {props.cash <= 0 ? "" : value}
    </div>
  );
};

class ExchangeCounter extends React.Component {
  state = {
    amount: "",
    product: "gas"
  };
  static defaultProps = {
    currencies: [
      {
        id: 1,
        name: "dollar",
        ratio: 3.6,
        title: "Wartość w dolarach: "
      },
      {
        id: 2,
        name: "euro",
        ratio: 4.1,
        title: "Wartość w euro: "
      },
      {
        id: 3,
        name: "pound",
        ratio: 4.45,
        title: "Wartość w funtach: "
      },
      {
        id: 4,
        name: "złote",
        ratio: 1,
        title: "Wartość w złotych: "
      }
    ],
    prices: {
      electricity: 0.52,
      gas: 4.76
    }
  };

  handleChange = e => {
    this.setState({
      amount: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      product: e.target.value,
      amount: ""
    });
  };

  insertSuffix(select) {
    if (select === "electricity") return <span>kWh</span>;
    else if (select === "gas") return <span>litrów</span>;
    else return null;
  }

  selectPrice(select) {
    const price = this.props.prices[select];
    return price;
  }

  render() {
    const { amount, product } = this.state;
    const price = this.selectPrice(product);

    const calculators = this.props.currencies.map(currency => (
      <Cash
        key={currency.id}
        ratio={currency.ratio}
        title={currency.title}
        cash={amount}
        price={price}
      />
    ));
    return (
      <div className="app">
        <h1>Oblicz wartość</h1>
        <label className="firstLabel">
          Wybierz produkt
          <select value={product} onChange={this.handleSelect}>
            <option value="electricity">prąd</option>
            <option value="gas">benzyna</option>
          </select>
        </label>
        <div className="typeAmount">Wpisz ilość poniżej</div>
        <label className="secondLabel">
          <input type="number" value={amount} onChange={this.handleChange} />
          {this.insertSuffix(this.state.product)}
        </label>
        {calculators}
      </div>
    );
  }
}

ReactDOM.render(<ExchangeCounter />, document.getElementById("root"));
