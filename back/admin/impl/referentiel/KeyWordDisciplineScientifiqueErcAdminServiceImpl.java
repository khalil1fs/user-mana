package com.ird.faa.service.admin.impl.referentiel;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.referentiel.DisciplineScientifiqueErc;
import com.ird.faa.bean.referentiel.KeyWord;
import com.ird.faa.bean.referentiel.KeyWordDisciplineScientifiqueErc;
import com.ird.faa.dao.referentiel.KeyWordDisciplineScientifiqueErcDao;
import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueErcAdminService;
import com.ird.faa.service.admin.facade.referentiel.KeyWordAdminService;
import com.ird.faa.service.admin.facade.referentiel.KeyWordDisciplineScientifiqueErcAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.KeyWordDisciplineScientifiqueErcVo;

@Service
public class KeyWordDisciplineScientifiqueErcAdminServiceImpl extends
		AbstractServiceImpl<KeyWordDisciplineScientifiqueErc> implements KeyWordDisciplineScientifiqueErcAdminService {

	@Autowired
	private KeyWordDisciplineScientifiqueErcDao keyWordDisciplineScientifiqueErcDao;

	@Autowired
	private KeyWordAdminService keyWordService;
	@Autowired
	private DisciplineScientifiqueErcAdminService disciplineScientifiqueErcService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<KeyWordDisciplineScientifiqueErc> findAll() {
		return keyWordDisciplineScientifiqueErcDao.findAll();
	}

	@Override
	public List<KeyWordDisciplineScientifiqueErc> findByKeyWordCode(String code) {
		return keyWordDisciplineScientifiqueErcDao.findByKeyWordCode(code);
	}

	@Override
	@Transactional
	public int deleteByKeyWordCode(String code) {
		return keyWordDisciplineScientifiqueErcDao.deleteByKeyWordCode(code);
	}

	@Override
	public List<KeyWordDisciplineScientifiqueErc> findByKeyWordId(Long id) {
		return keyWordDisciplineScientifiqueErcDao.findByKeyWordId(id);
	}

	@Override
	@Transactional
	public int deleteByKeyWordId(Long id) {
		return keyWordDisciplineScientifiqueErcDao.deleteByKeyWordId(id);
	}

	@Override
	public List<KeyWordDisciplineScientifiqueErc> findByDisciplineScientifiqueErcCode(String code) {
		return keyWordDisciplineScientifiqueErcDao.findByDisciplineScientifiqueErcCode(code);
	}

	@Override
	@Transactional
	public int deleteByDisciplineScientifiqueErcCode(String code) {
		return keyWordDisciplineScientifiqueErcDao.deleteByDisciplineScientifiqueErcCode(code);
	}

	@Override
	public List<KeyWordDisciplineScientifiqueErc> findByDisciplineScientifiqueErcId(Long id) {
		return keyWordDisciplineScientifiqueErcDao.findByDisciplineScientifiqueErcId(id);
	}

	@Override
	@Transactional
	public int deleteByDisciplineScientifiqueErcId(Long id) {
		return keyWordDisciplineScientifiqueErcDao.deleteByDisciplineScientifiqueErcId(id);
	}

	@Override
	public KeyWordDisciplineScientifiqueErc findById(Long id) {
		if (id == null)
			return null;
		return keyWordDisciplineScientifiqueErcDao.getOne(id);
	}

	@Override
	public KeyWordDisciplineScientifiqueErc findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (keyWordDisciplineScientifiqueErcDao.findById(id).isPresent()) {
			keyWordDisciplineScientifiqueErcDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public KeyWordDisciplineScientifiqueErc update(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc) {
		KeyWordDisciplineScientifiqueErc foundedKeyWordDisciplineScientifiqueErc = findById(
				keyWordDisciplineScientifiqueErc.getId());
		if (foundedKeyWordDisciplineScientifiqueErc == null)
			return null;
		else {
			return keyWordDisciplineScientifiqueErcDao.save(keyWordDisciplineScientifiqueErc);
		}
	}

	@Override
	public KeyWordDisciplineScientifiqueErc save(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc) {

		findKeyWord(keyWordDisciplineScientifiqueErc);
		findDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc);

		return keyWordDisciplineScientifiqueErcDao.save(keyWordDisciplineScientifiqueErc);

	}

	@Override
	public List<KeyWordDisciplineScientifiqueErc> save(
			List<KeyWordDisciplineScientifiqueErc> keyWordDisciplineScientifiqueErcs) {
		List<KeyWordDisciplineScientifiqueErc> list = new ArrayList<>();
		for (KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc : keyWordDisciplineScientifiqueErcs) {
			list.add(save(keyWordDisciplineScientifiqueErc));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc) {
		if (keyWordDisciplineScientifiqueErc.getId() == null)
			return -1;
		KeyWordDisciplineScientifiqueErc foundedKeyWordDisciplineScientifiqueErc = findById(
				keyWordDisciplineScientifiqueErc.getId());
		if (foundedKeyWordDisciplineScientifiqueErc == null)
			return -1;
		keyWordDisciplineScientifiqueErcDao.delete(foundedKeyWordDisciplineScientifiqueErc);
		return 1;
	}

	public List<KeyWordDisciplineScientifiqueErc> findByCriteria(
			KeyWordDisciplineScientifiqueErcVo keyWordDisciplineScientifiqueErcVo) {

		String query = "SELECT o FROM KeyWordDisciplineScientifiqueErc o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", keyWordDisciplineScientifiqueErcVo.getId());
		if (keyWordDisciplineScientifiqueErcVo.getKeyWordVo() != null) {
			query += SearchUtil.addConstraint("o", "keyWord.id", "=",
					keyWordDisciplineScientifiqueErcVo.getKeyWordVo().getId());
			query += SearchUtil.addConstraint("o", "keyWord.code", "LIKE",
					keyWordDisciplineScientifiqueErcVo.getKeyWordVo().getCode());
		}

		if (keyWordDisciplineScientifiqueErcVo.getDisciplineScientifiqueErcVo() != null) {
			query += SearchUtil.addConstraint("o", "disciplineScientifiqueErc.id", "=",
					keyWordDisciplineScientifiqueErcVo.getDisciplineScientifiqueErcVo().getId());
			query += SearchUtil.addConstraint("o", "disciplineScientifiqueErc.code", "LIKE",
					keyWordDisciplineScientifiqueErcVo.getDisciplineScientifiqueErcVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findKeyWord(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc) {
		KeyWord loadedKeyWord = keyWordService.findByIdOrCode(keyWordDisciplineScientifiqueErc.getKeyWord());

		if (loadedKeyWord == null) {
			return;
		}
		keyWordDisciplineScientifiqueErc.setKeyWord(loadedKeyWord);
	}

	private void findDisciplineScientifiqueErc(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc) {
		DisciplineScientifiqueErc loadedDisciplineScientifiqueErc = disciplineScientifiqueErcService
				.findByIdOrCode(keyWordDisciplineScientifiqueErc.getDisciplineScientifiqueErc());

		if (loadedDisciplineScientifiqueErc == null) {
			return;
		}
		keyWordDisciplineScientifiqueErc.setDisciplineScientifiqueErc(loadedDisciplineScientifiqueErc);
	}

	@Override
	@Transactional
	public void delete(List<KeyWordDisciplineScientifiqueErc> keyWordDisciplineScientifiqueErcs) {
		if (ListUtil.isNotEmpty(keyWordDisciplineScientifiqueErcs)) {
			keyWordDisciplineScientifiqueErcs.forEach(e -> keyWordDisciplineScientifiqueErcDao.delete(e));
		}
	}

	@Override
	public void update(List<KeyWordDisciplineScientifiqueErc> keyWordDisciplineScientifiqueErcs) {
		if (ListUtil.isNotEmpty(keyWordDisciplineScientifiqueErcs)) {
			keyWordDisciplineScientifiqueErcs.forEach(e -> keyWordDisciplineScientifiqueErcDao.save(e));
		}
	}

}
