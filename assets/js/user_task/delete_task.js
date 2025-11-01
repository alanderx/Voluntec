function deleteTask(id) {
  const fd = new FormData();
  fd.append('id', id);
  return fetch('../../app/user_task/delete_task.php', { method: 'POST', body: fd, credentials: 'same-origin' })
    .then(async resp => {
      let data;
      try { data = await resp.json(); } catch (e) { data = { codigo: false, msg: 'Invalid server response' }; }
      return { status: resp.status, ok: resp.ok, body: data };
    })
    .catch(err => ({ status: 0, ok: false, body: { codigo: false, msg: 'Network error: ' + err.message } }));
}

function removeTask(taskOrId, onSuccess) {
  if (!confirm('Do you want to remove this task assignment?')) return;
  const id = typeof taskOrId === 'number' ? taskOrId : (taskOrId && taskOrId.id) ? taskOrId.id : null;
  if (!id) return alert('Invalid task ID for deletion.');
  console.log('Deleting task id=', id);
  deleteTask(id).then(result => {
    console.log('deleteTask response:', result);
    const body = result.body || {};
    if (result.ok && body.codigo) {
      if (typeof onSuccess === 'function') onSuccess();
    } else {
      alert(body.msg || 'Error removing assignment.');
    }
  });
}

window.deleteTask = deleteTask;
window.removeTask = removeTask;

