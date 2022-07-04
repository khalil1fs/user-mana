package com.ird.faa.service.admin.impl.referentiel;

import java.util.List;
import java.util.Date;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.referentiel.StatusCursus;
import com.ird.faa.dao.referentiel.StatusCursusDao;
import com.ird.faa.service.admin.facade.referentiel.StatusCursusAdminService;

import com.ird.faa.ws.rest.provided.vo.referentiel.StatusCursusVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class StatusCursusAdminServiceImpl extends AbstractServiceImpl<StatusCursus>
		implements StatusCursusAdminService {

	@Autowired
	private StatusCursusDao statusCursusDao;

	@Autowired
	private ArchivableService<StatusCursus> archivableService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<StatusCursus> findAll() {
		return statusCursusDao.findAll();
	}

	@Override
	public StatusCursus findByCode(String code) {
		if (code == null)
			return null;
		return statusCursusDao.findByCode(code);
	}

	@Override
	@Transactional
	public int deleteByCode(String code) {
		return statusCursusDao.deleteByCode(code);
	}

	@Override
	public StatusCursus findByIdOrCode(StatusCursus statusCursus) {
		StatusCursus resultat = null;
		if (statusCursus != null) {
			if (StringUtil.isNotEmpty(statusCursus.getId())) {
				resultat = statusCursusDao.getOne(statusCursus.getId());
			} else if (StringUtil.isNotEmpty(statusCursus.getCode())) {
				resultat = statusCursusDao.findByCode(statusCursus.getCode());
			}
		}
		return resultat;
	}

	@Override
	public StatusCursus findById(Long id) {
		if (id == null)
			return null;
		return statusCursusDao.getOne(id);
	}

	@Override
	public StatusCursus findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Override
	public StatusCursus archiver(StatusCursus statusCursus) {
		if (statusCursus.getArchive() == null) {
			statusCursus.setArchive(false);
		}
		statusCursus.setArchive(true);
		statusCursus.setDateArchivage(new Date());
		statusCursusDao.save(statusCursus);
		return statusCursus;

	}

	@Override
	public StatusCursus desarchiver(StatusCursus statusCursus) {
		if (statusCursus.getArchive() == null) {
			statusCursus.setArchive(false);
		}
		statusCursus.setArchive(false);
		statusCursus.setDateArchivage(null);
		statusCursusDao.save(statusCursus);
		return statusCursus;
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (statusCursusDao.findById(id).isPresent()) {
			statusCursusDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public StatusCursus update(StatusCursus statusCursus) {
		StatusCursus foundedStatusCursus = findById(statusCursus.getId());
		if (foundedStatusCursus == null)
			return null;
		else {
			archivableService.prepare(statusCursus);
			return statusCursusDao.save(statusCursus);
		}
	}


	@Override
	public StatusCursus save(StatusCursus statusCursus) {

		StatusCursus result = null;
		StatusCursus foundedStatusCursus = findByCode(statusCursus.getCode());
		if (foundedStatusCursus == null) {
			prepare(statusCursus);

			StatusCursus savedStatusCursus = statusCursusDao.save(statusCursus);

			result = savedStatusCursus;
		}

		return result;
	}

	@Override
	public List<StatusCursus> save(List<StatusCursus> statusCursuss) {
		List<StatusCursus> list = new ArrayList<>();
		for (StatusCursus statusCursus : statusCursuss) {
			list.add(save(statusCursus));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(StatusCursus statusCursus) {
		if (statusCursus.getCode() == null)
			return -1;

		StatusCursus foundedStatusCursus = findByCode(statusCursus.getCode());
		if (foundedStatusCursus == null)
			return -1;
		statusCursusDao.delete(foundedStatusCursus);
		return 1;
	}

	public List<StatusCursus> findByCriteria(StatusCursusVo statusCursusVo) {

		String query = "SELECT o FROM StatusCursus o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", statusCursusVo.getId());
		query += SearchUtil.addConstraint("o", "libelle", "LIKE", statusCursusVo.getLibelle());
		query += SearchUtil.addConstraint("o", "code", "LIKE", statusCursusVo.getCode());
		query += SearchUtil.addConstraint("o", "archive", "=", statusCursusVo.getArchive());
		query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", statusCursusVo.getDateArchivage());
		query += SearchUtil.addConstraintDate("o", "dateCreation", "=", statusCursusVo.getDateCreation());
		query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", statusCursusVo.getDateArchivageMin(),
				statusCursusVo.getDateArchivageMax());
		query += SearchUtil.addConstraintMinMaxDate("o", "dateCreation", statusCursusVo.getDateCreationMin(),
				statusCursusVo.getDateCreationMax());
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	@Transactional
	public void delete(List<StatusCursus> statusCursuss) {
		if (ListUtil.isNotEmpty(statusCursuss)) {
			statusCursuss.forEach(e -> statusCursusDao.delete(e));
		}
	}

	@Override
	public void update(List<StatusCursus> statusCursuss) {
		if (ListUtil.isNotEmpty(statusCursuss)) {
			statusCursuss.forEach(e -> statusCursusDao.save(e));
		}
	}

}
