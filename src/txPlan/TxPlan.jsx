const TxPlan = (txArray) => {
    return (
        <div className="col-12">
            {txArray.map((tx, index) => {
                const { name, cost } = tx;
                return (
                    <div key={index} className="col-12 d-flex justify-content-between">
                        <div>{name}</div>
                        <div>{cost}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default TxPlan;