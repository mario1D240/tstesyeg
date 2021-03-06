import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react'
import cx from 'classnames';

import styles from '../../css/bootstrap.module.css'
import overrideStyles from '../../css/app.module.css'

class DatasetDetails extends Component {
    renderResources = (resources, datasetName) => {
        let items = []
        resources.forEach((resource, i) => {
            let restricted = resource.restricted ? JSON.parse(resource.restricted) : 'N/A'
            let datetime = resource.last_modified || resource.created
            items.push(
                <li className={cx(styles['list-group-item'], overrideStyles['list-group-item'], styles['d-flex'], styles['flex-wrap'], styles['align-items-center'])} key={i}>
                    <span className={overrideStyles['type']}>
                        <span className={cx(styles['badge'], styles['badge-secondary'])}>{resource.format}</span>
                    </span>
                    <a className={cx(styles['px-3'], styles['title'], overrideStyles['title'])} href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}</a>
                    {datetime && <span className={cx(styles['ml-auto'], styles['mr-3'], styles['date'], overrideStyles['date'])}>{this.formatDate(datetime)}</span>}
                    <span className={cx(styles['visibility'], overrideStyles['visibility'])}>
                        <span className={cx(styles['badge'], styles['badge-pill'], styles['badge-dark'])}>{restricted.level}</span>
                    </span>
                </li>
            )
        })

        return items
    }

    formatDate = date => {
        const d = new Date(date)
        return d.toLocaleDateString(navigator.language || 'fr-FR')
    }

    render() {
        const {
            ckanAPI,
            linkToCKANLabel,
            name,
            notes,
            resources,
            dataset_creation_date,
            dataset_modification_date,
            dataset_publication_date,
            organization,
            collapsed
        } = this.props

        const orgName = organization !== null ? organization.title : 'N/A'
        const collapseClass = collapsed ? 'collapse' : ''

        return(
            <div className={cx(styles['card-footer'], styles['px-5'], styles['py-4'], styles[collapseClass])}>
                <p className={styles['lead']}>{notes}</p>
                <hr/>
                <ul className={cx(styles['text-muted'], styles['list-inline'])}>
                    {dataset_creation_date && <li className={styles['list-inline-item']}><strong>Cr???? le&nbsp;:</strong> {this.formatDate(dataset_creation_date)}</li>}
                    {dataset_publication_date && <li className={styles['list-inline-item']}><strong>Publi?? le&nbsp;:</strong> {this.formatDate(dataset_publication_date)}</li>}
                    {dataset_modification_date && <li className={styles['list-inline-item']}><strong>Modifi?? le&nbsp;:</strong> {this.formatDate(dataset_modification_date)}</li>}
                    <li className={styles['list-inline-item']}><strong>Organisation&nbsp;:</strong> {orgName}</li>
                </ul>
                <div className={styles['my-4']}>
                    <h3>Ressources</h3>
                    <ul className={styles['list-inline']}>
                        { this.renderResources(resources, name) }
                    </ul>
                </div>
                <a className={cx(styles['btn'], styles['btn'], styles['btn-success'], styles['mb-1'] )} href={`${ckanAPI}/dataset/${name}`} target="_blank" rel="noopener noreferrer">
                    <MaterialIcon icon="open_in_new" size="tiny" color="#fff" />
                    <span className={styles['ml-1']}>{linkToCKANLabel}</span>
                </a>
            </div>
        )
    }
}

export default DatasetDetails
