import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import './CompanyCard.css';

function CompanyCard({ company }) {

    return (
        <Link to={`/companies/${company.handle}`} >
            <Card className='card-container'>
                <CardBody>
                    <CardTitle className="font-weight-bold">
                        {company.name}
                    </CardTitle>
                    <CardText>{company.description}</CardText>
                </CardBody>
            </Card>
        </Link>
    );
}

export default CompanyCard;